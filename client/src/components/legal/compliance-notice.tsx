import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, CheckCircle, FileText } from 'lucide-react';

export function ComplianceNotice() {
  return (
    <div className="glass-morphism p-4 rounded-lg border border-neural-primary/20">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="w-5 h-5 text-neural-primary" />
        <h3 className="font-semibold text-sm">Legal & Compliance</h3>
      </div>
      
      <div className="space-y-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-3 h-3 text-green-500" />
          <span>Licensed marketplace operator</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-3 h-3 text-green-500" />
          <span>Parts authenticity verified</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-3 h-3 text-green-500" />
          <span>Insurance coverage included</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-3 h-3 text-yellow-500" />
          <span>Installation by certified professionals recommended</span>
        </div>
      </div>
      
      <div className="mt-3 pt-2 border-t border-border/50">
        <p className="text-xs text-muted-foreground">
          ShopHand™ is a trademark of Star Soul Enterprise LLC. Platform facilitates connections between parts suppliers and customers. Delivery times are estimates.
        </p>
      </div>
    </div>
  );
}