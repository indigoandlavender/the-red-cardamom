'use client';

interface StoryBodyProps {
  content: string;
  theFacts?: string;
}

export default function StoryBody({ content, theFacts }: StoryBodyProps) {
  // Convert line breaks to proper paragraphs
  const paragraphs = content
    .split(/\n\n+/)
    .filter((p) => p.trim())
    .map((p) => p.trim());

  // Parse the_facts if provided
  const facts = theFacts
    ? theFacts
        .split('\n')
        .map((f) => f.trim())
        .filter((f) => f && f.startsWith('-'))
        .map((f) => f.substring(1).trim())
    : [];

  return (
    <div className="prose">
      {paragraphs.map((paragraph, index) => {
        // Check for blockquote (starts with >)
        if (paragraph.startsWith('>')) {
          return (
            <blockquote key={index}>
              {paragraph.substring(1).trim()}
            </blockquote>
          );
        }
        
        // Check for subheading (starts with ##)
        if (paragraph.startsWith('## ')) {
          return (
            <h2 key={index} className="font-serif text-2xl mt-12 mb-6">
              {paragraph.substring(3).trim()}
            </h2>
          );
        }

        // Regular paragraph - handle inline formatting
        const formattedContent = paragraph
          .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.+?)\*/g, '<em>$1</em>')
          .replace(/_(.+?)_/g, '<em>$1</em>');

        return (
          <p
            key={index}
            dangerouslySetInnerHTML={{ __html: formattedContent }}
          />
        );
      })}

      {/* The Facts Section */}
      {facts.length > 0 && (
        <div className="the-facts mt-12">
          <h3 className="text-xs uppercase tracking-[0.15em] text-[var(--muted)] mb-4 font-sans font-medium">
            The Facts
          </h3>
          <ul>
            {facts.map((fact, index) => (
              <li key={index} dangerouslySetInnerHTML={{ 
                __html: fact
                  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.+?)\*/g, '<em>$1</em>')
              }} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
