import { IncomingMessage, OutgoingMessage } from 'http';
import { serialize } from 'cookie';
import Cookies, { CookieChangeOptions } from 'universal-cookie';

const cookieKeys = {
  accessToken: 'ACCESS_TOKEN',
};

export const isAuthenticated = (req, res) => {
  // JWT の有無しか見ていないけど、期限のチェックも入れるべき
  return !!getAccessToken(req, res);
};

export const getAccessToken = (req, res) => {
  const cookies = getCookiesInstance(req, res);
  return cookies.get(cookieKeys.accessToken);
};

export const setAccessToken = (token) => {
  const cookies = new Cookies();
  cookies.set(cookieKeys.accessToken, token);
};

const getCookiesInstance = (req, res) => {
  if (process.server) {
    return createServerCookie(req.headers.cookie, res);
  } else {
    return new Cookies();
  }
};

// サーバー側での Cookie の変更をクライアントに伝えられるようにしておく
const createServerCookie = (cookie, res) => {
  const universalCookie = new Cookies(cookie);
  universalCookie.addChangeListener((change) => {
    if (res.headersSent) {
      return;
    }
    let cookieHeader = res.getHeader('Set-Cookie');
    if (typeof cookieHeader === 'string') {
      cookieHeader = [cookieHeader];
    } else if (typeof cookieHeader === 'number') {
      cookieHeader = [cookieHeader.toString()];
    }
    cookieHeader = (cookieHeader) || [];

    if (change.value === undefined) {
      cookieHeader.push(serialize(change.name, '', change.options));
    } else {
      cookieHeader.push(serialize(change.name, change.value, change.options));
    }

    res.setHeader('Set-Cookie', cookieHeader);
  });

  return universalCookie;
};
