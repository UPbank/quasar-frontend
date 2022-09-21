type SidebarPage = CollapsibleSidebarPage | LinkSidebarPage;

interface BaseSidebarPage {
  label: () => string;
}

export interface CollapsibleSidebarPage extends BaseSidebarPage {
  children: SidebarPage[];
  to?: undefined;
}

export interface LinkSidebarPage extends BaseSidebarPage {
  children?: undefined;
  to: string;
}

export default SidebarPage;
