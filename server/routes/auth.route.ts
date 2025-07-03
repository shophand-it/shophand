import express from 'express';
import session from 'express-session';
import bcrypt from 'bcrypt';
import connectPg from 'connect-pg-simple';
import { storage } from './orders.Routes';

const router = express.Router();

const pgStore = connectPg(session);

export function setupAuth(app: express.Express) {
  // Session configuration
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: 7 * 24 * 60 * 60, // 1 week
  });

  app.use(session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET || 'shophand-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    },
  }));

  // Authentication routes
  app.post('/api/auth/register', async (req, res) => {
    try {
      const { email, password, firstName, lastName, userType = 'customer' } = req.body;

      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await storage.createUser({
        username: email, // Use email as username
        email,
        password: hashedPassword,
        firstName,
        lastName,
        userType,
      });

      // Set session
      req.session.userId = user.id;
      req.session.userType = user.userType;

      res.json({ 
        user: { 
          id: user.id, 
          username: user.username, 
          email: user.email, 
          firstName: user.firstName,
          lastName: user.lastName,
          userType: user.userType 
        } 
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Registration failed' });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Check password
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Set session
      req.session.userId = user.id;
      req.session.userType = user.userType;

      res.json({ 
        user: { 
          id: user.id, 
          username: user.username, 
          email: user.email, 
          firstName: user.firstName,
          lastName: user.lastName,
          userType: user.userType 
        } 
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  });

  app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Logout failed' });
      }
      res.json({ message: 'Logged out successfully' });
    });
  });

  app.get('/api/auth/user', async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      res.json({ 
        user: { 
          id: user.id, 
          username: user.username, 
          email: user.email, 
          firstName: user.firstName,
          lastName: user.lastName,
          userType: user.userType 
        } 
      });
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ error: 'Failed to get user' });
    }
  });
}

// Middleware to check authentication
export function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
}

// Middleware to check user type
export function requireUserType(userType: string) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.session.userType !== userType) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
}

// Add auth routes
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, userType } = req.body;
    
    // Check if user already exists
    const existingUser = await storage.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const userData = {
      email,
      username: email, // Use email as username for now
      password: hashedPassword,
      firstName,
      lastName,
      userType,
    };
    
    console.log('Creating user with data:', userData);
    const newUser = await storage.createUser(userData);

    req.session.userId = newUser.id;
    req.session.userType = newUser.userType;
    
    res.json({ user: { id: newUser.id, email: newUser.email, userType: newUser.userType } });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await storage.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    req.session.userId = user.id;
    req.session.userType = user.userType;
    
    res.json({ user: { id: user.id, email: user.email, userType: user.userType } });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

router.get('/me', (req, res) => {
  if (req.session.userId) {
    res.json({ 
      user: { 
        id: req.session.userId, 
        userType: req.session.userType 
      } 
    });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

export default router;

declare module 'express-session' {
  interface SessionData {
    userId: number;
    userType: string;
  }
}