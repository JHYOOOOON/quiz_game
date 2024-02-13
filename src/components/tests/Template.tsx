import { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";

import * as Theme from "../../theme";

export const Template = ({ children }: PropsWithChildren) => <ThemeProvider theme={Theme}>{children}</ThemeProvider>;
