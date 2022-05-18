import { App } from 'vue';
import pageContnet from '@/components/page-content';
import PageSearch from '@/components/page-search';
import PageModal from '@/components/page-modal';
import { formatUtcString } from '@/utils/date-format';

const components = [pageContnet, PageSearch, PageModal];
export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component);
  }
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUtcString(value);
    }
  };
}
