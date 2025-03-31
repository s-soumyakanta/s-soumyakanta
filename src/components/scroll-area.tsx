import { PropsWithChildren } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";

const scrollbarStyles = `
  .ScrollAreaRoot {
    width: 100%;
    --scrollbar-size: 2px;
    overflow: auto;
  }

  .ScrollAreaViewport {
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  .ScrollAreaScrollbar {
    display: flex;
    user-select: none;
    touch-action: none;
    padding: 5px;
    transition: background 160ms ease-out;
  }

  .ScrollAreaScrollbar[data-orientation='vertical'] {
    width: 5px;
  }

  .ScrollAreaScrollbar[data-orientation='horizontal'] {
    flex-direction: column;
    height: 5px;
  }

  .ScrollAreaThumb {
    flex: 1;
    border-radius: 20px;
    position: relative;
  }
`;

const CustomScrollArea: React.FC<PropsWithChildren> = ({ children }) => (
  <>
    <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />
    <ScrollArea.Root type="scroll" className="ScrollAreaRoot">
      <ScrollArea.Viewport className="ScrollAreaViewport">
        {children}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
        <ScrollArea.Thumb className="ScrollAreaThumb" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  </>
);

export default CustomScrollArea;
