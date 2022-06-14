export const RenderIf = (condition: boolean, content: () => JSX.Element): JSX.Element => (condition ? content() : <></>);

export const RenderPresent = (value: any, content: () => JSX.Element): JSX.Element => (value == null ? <></> : content());

export const RenderNull = (value: any, content: () => JSX.Element): JSX.Element => (value == null ? content() : <></>);
