// src/templates/saas/(seoghost)/_templates/index.ts
//
// One template per page type. A collection's type (chosen in SEOGhost) picks the
// view its pages are rendered with. An unknown type — added in SEOGhost after
// you copied this folder — falls back to UseCaseView, which renders every
// generic block: a new type never breaks your site.
import { createElement, type ComponentType } from 'react';

import type { PageType, ViewProps } from '../_types/pages';
import UseCaseView from './UseCaseView';

const TEMPLATES: Record<PageType, ComponentType<ViewProps>> = {
  use_case: UseCaseView,
};

/** Renders `page` with the template of its type. */
export function PageTemplate(props: ViewProps) {
  return createElement(TEMPLATES[props.page.page_type as PageType] ?? UseCaseView, props);
}
