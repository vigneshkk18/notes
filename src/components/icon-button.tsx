import { PropsWithChildren } from "react";

interface IIconButton
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export default function IconButton({
  children,
  className = "",
  ...props
}: PropsWithChildren<IIconButton>) {
  return (
    <button
      className={`${className} bg-transparent px-2 py-1 rounded-full outline-none`}
      {...props}
    >
      {children}
    </button>
  );
}
