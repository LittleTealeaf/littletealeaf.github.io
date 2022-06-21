export const RenderIf = (condition: boolean, content: () => JSX.Element) => (condition ? content() : <></>);

export const RenderNotNull = (value: any, content: () => JSX.Element) => RenderIf(value != null, content);

export const RenderNull = (value: any, content: () => JSX.Element) => RenderIf(value == null, content);
