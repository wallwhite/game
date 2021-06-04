import Bowser from 'bowser';

const checkIsDesktopPlatform = () => {
    const browser = Bowser.getParser(window.navigator.userAgent);
    const platform = browser.getPlatform();
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isiPad = userAgent.indexOf('ipad') > -1 || (userAgent.indexOf('macintosh') > -1 && 'ontouchend' in document);

    return platform.type === 'desktop' && !isiPad;
};

export default checkIsDesktopPlatform;
