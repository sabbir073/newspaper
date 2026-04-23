import ArticleToolbar from './ArticleToolbar';

interface ArticleBodyProps {
  title: string;
  body: string;
  showBottomShare?: boolean;
}

export default function ArticleBody({ title, body, showBottomShare = true }: ArticleBodyProps) {
  return (
    <>
      <div
        id="article-body"
        className="prose-bangla text-foreground transition-[font-size] duration-200"
        dangerouslySetInnerHTML={{ __html: body }}
      />

      {showBottomShare && (
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <span className="text-[17px] font-semibold text-foreground">এই সংবাদটি শেয়ার করুন</span>
            <ArticleToolbar title={title} compact shareOnly />
          </div>
        </div>
      )}
    </>
  );
}
