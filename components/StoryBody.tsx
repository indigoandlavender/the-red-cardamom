'use client';

interface StoryBodyProps {
  content: string;
  theFacts?: string;
}

export default function StoryBody({ content, theFacts }: StoryBodyProps) {
  // Handle <br><br> or \n\n as paragraph breaks
  const paragraphs = content
    .replace(/<br><br>/gi, '\n\n')
    .replace(/<br>/gi, '\n')
    .split(/\n\n+/)
    .filter((p) => p.trim())
    .map((p) => p.trim());

  // Parse the_facts - pipe separated (|) format from Excel
  const facts = theFacts
    ? theFacts
        .split('|')
        .map((f) => f.trim())
        .filter(Boolean)
    : [];

  return (
    <>
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
            <h2 key={index}>
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
        <div className="the-facts">
          <h3>The Facts</h3>
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
    </>
  );
}
