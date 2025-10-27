import {
  TypingText,
  TypingTextCursor,
} from "@/components/animate-ui/primitives/texts/typing";

interface TypeTextProps {
  text: string;
}

export default function TypeText({ text }: TypeTextProps) {
  return (
    <div className="my-4 text-lg font-bold">
      <pre>
        <TypingText text={text}>
          <TypingTextCursor className="ml-2 h-2 !w-2" />
        </TypingText>
      </pre>
    </div>
  );
}
