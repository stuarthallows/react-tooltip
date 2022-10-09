import { cloneElement, Fragment, useState, useMemo, useRef, ReactElement } from "react";
import {
  arrow,
  Placement,
  offset,
  flip,
  shift,
  useFloating,
  useInteractions,
  useHover,
  useFocus,
  useRole,
  useDismiss,
} from "@floating-ui/react-dom-interactions";
import { mergeRefs } from "react-merge-refs";
import "./Tooltip.css";

type Props = {
  content: ReactElement | string;
  placement?: Placement;
  children: JSX.Element;
}

export const Tooltip = ({ content, placement = "top", children }: Props) => {
  const arrowRef = useRef(null);
  const [open, setOpen] = useState(false);

  const { 
    x, 
    y, 
    reference, 
    floating, 
    context,
    middlewareData,
    placement: finalPlacement,
    strategy, 
  } = useFloating({
    open,
    placement,
    middleware: [
      offset(8),
      flip(),
      shift({ padding: 5 }),
      arrow({ element: arrowRef }),
    ],
    onOpenChange: setOpen,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      delay: {
        open: 200,
        close: 0,
      },
    }),
    useFocus(context),
    useRole(context, { role: "tooltip" }),
    useDismiss(context),
  ]);

  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[finalPlacement.split('-')[0]] ?? '';

  // Preserve the consumer's ref
  const ref = useMemo(() => mergeRefs([reference, (children as any).ref]), [
    reference,
    children
  ]);

  // If there is no tooltip content render the children without the tooltip
  if (content === "" || content == null) {
    return children;
  }
  
  return (
    <Fragment>
      {cloneElement(children, getReferenceProps({ ref, ...children.props }))}
        {open && (
          <div
            className="floating"
            ref={floating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0
            }}
            {...getFloatingProps()}
          >
            {content}
            <div
              className="arrow"
              ref={arrowRef}
              style={{
                left: middlewareData.arrow?.x != null ? `${middlewareData.arrow.x}px` : '',
                top: middlewareData.arrow?.y != null ? `${middlewareData.arrow.y}px` : '',
                [staticSide]: '-4px',
              }}
            />
          </div>
        )}
    </Fragment>
  );
};
