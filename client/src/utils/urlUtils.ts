export const urlUtils = {
    getCurrentPageFromUrl: (): number => {
      const urlParams = new URLSearchParams(window.location.search);
      const page = parseInt(urlParams.get('page') || '1', 10);
      return Math.max(1, page);
    },
  
    updateUrlWithPage: (page: number) => {
      const url = new URL(window.location.href);
      
      if (page === 1) {
        url.searchParams.delete('page');
      } else {
        url.searchParams.set('page', page.toString());
      }
  
      window.history.pushState({ page }, '', url.toString());
    },
  
    onPopState: (callback: (page: number) => void) => {
      const handlePopState = (event: PopStateEvent) => {
        const page = event.state?.page || urlUtils.getCurrentPageFromUrl();
        callback(page);
      };
  
      window.addEventListener('popstate', handlePopState);
  
      return () => window.removeEventListener('popstate', handlePopState);
    }
  };