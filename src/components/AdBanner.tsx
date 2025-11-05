import { Card } from '@/components/ui/card';

interface AdBannerProps {
  size?: 'leaderboard' | 'rectangle' | 'skyscraper' | 'mobile';
  className?: string;
}

const AdBanner = ({ size = 'rectangle', className = '' }: AdBannerProps) => {
  const dimensions = {
    leaderboard: { width: 728, height: 90 },
    rectangle: { width: 300, height: 250 },
    skyscraper: { width: 160, height: 600 },
    mobile: { width: 320, height: 100 }
  };

  const dim = dimensions[size];

  // Replace 'ca-pub-XXXXXXXXXXXXXXXX' with your actual AdSense publisher ID
  // To enable real ads, replace the placeholder with your actual ad slot ID

  return (
    <Card className={`overflow-hidden border border-border/50 bg-muted/30 ${className}`}>
      <div 
        className="flex flex-col items-center justify-center gap-2 p-4"
        style={{ 
          minWidth: size === 'mobile' ? '100%' : `${dim.width}px`,
          minHeight: `${dim.height}px`,
          maxWidth: '100%'
        }}
      >
        <div className="text-xs text-muted-foreground font-medium tracking-wide">
          Advertisement
        </div>
        {/* AdSense ad unit - Replace data-ad-client and data-ad-slot with your values
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        */}
        <div 
          className="relative w-full bg-gradient-to-br from-muted to-muted/50 rounded border border-border/30 flex items-center justify-center"
          style={{ 
            height: `${Math.max(dim.height - 40, 60)}px`
          }}
        >
          <div className="text-center space-y-1 px-4">
            <div className="text-sm font-semibold text-muted-foreground/60">
              Google AdSense
            </div>
            <div className="text-xs text-muted-foreground/40">
              {dim.width} × {dim.height}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AdBanner;
