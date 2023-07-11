import { NODE_ENV} from '@/config';
import { ShortURL } from '@/models/url.model';
import { NextFunction, Request, Response } from 'express';
import shortid from 'shortid';

const URL_REGEX = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

export class IndexController {
  public getIndex = async (_: Request, res: Response, next: NextFunction) => {
    res.render('index');
  };

  public saveURL = async (req: Request, res: Response, next: NextFunction) => {
    const { url }: { url: string | undefined } = req.body;
    if (!url.match(URL_REGEX)) {
      return res.redirect('/');
    }
    try {
      // verify if exists
      const oneURL = await ShortURL.findOne({
        url,
      });
      const host = NODE_ENV !== 'production'? req.header('host'): req.hostname
      if (oneURL) {
        return res.render('shorten', {
          url: `${host}/${oneURL.hash}`,
        });
      }
      const hash: string = shortid.generate();
      const new_url = new ShortURL({
        url,
        hash,
      });
      await new_url.save();
      return res.render('shorten', {
        url: `${host}/${new_url.hash}`,
      });
    } catch (e) {
      return next(e);
    }
  };

  public getURL = async (req: Request, res: Response, next: NextFunction) => {
    const hash: string | undefined = req.params.hash;
    if (!hash) {
      return res.redirect('/');
    }
    try {
      const url: any = await ShortURL.findOne({
        hash,
      });
      if (!url) {
        return res.render('404');
      }
      url.click += 1;
      await url.save();
      res.redirect(url.url);
    } catch (e) {
      return next(e);
    }
  };
}
