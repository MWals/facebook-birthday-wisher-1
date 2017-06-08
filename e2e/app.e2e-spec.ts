import { FacebookBirthdayWisherPage } from './app.po';

describe('facebook-birthday-wisher App', () => {
  let page: FacebookBirthdayWisherPage;

  beforeEach(() => {
    page = new FacebookBirthdayWisherPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
