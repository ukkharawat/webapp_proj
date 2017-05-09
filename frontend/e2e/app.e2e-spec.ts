import { AngularWebAppPage } from './app.po';

describe('angular-web-app App', function() {
  let page: AngularWebAppPage;

  beforeEach(() => {
    page = new AngularWebAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
