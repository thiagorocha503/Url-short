import { Router, Request, Response, NextFunction } from "express";
import { ShortURL } from "@src/schemas/URL";
import shortid from "shortid";
require("dotenv").config();

const URL_REGEX =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

const host = process.env.HOST || "www";

const router = Router();
router.get("/", async (req: Request, res: Response) => {
    res.render("index");
});
router.get("/shorten", async (req: Request, res: Response) => {
    res.redirect("/");
});
router.post(
    "/shorten",
    async (req: Request, res: Response, next: NextFunction) => {
        const { url }: { url: string | undefined } = req.body;
        if (url === undefined || !url.match(URL_REGEX)) {
            return res.redirect("/");
        }
        try {
            // verify if exists
            const oneURL = await ShortURL.findOne({
                url,
            });
            if (oneURL !== null) {
                return res.render("shorten", {
                    url: `${host}/${oneURL.hash}`,
                });
            }
            const hash: string = shortid.generate();
            const new_short = new ShortURL({
                url,
                hash: hash,
                count: 0,
            });
            await new_short.save();
            console.log(`${host}/${new_short.hash}`);
            return res.render("shorten", {
                url: `${host}/${new_short.hash}`,
            });
        } catch (e) {
            return next(e);
        }
    }
);

router.get(
    "/:hash",
    async (req: Request, res: Response, next: NextFunction) => {
        const hash: string | undefined = req.params.hash;
        if (hash === undefined) {
            return res.redirect("/");
        }
        try {
            const url: any = await ShortURL.findOne({
                hash,
            });
            if (url === null) {
                return res.render("404");
            }
            url.click += 1;
            await url.save();
            res.redirect(url.url);
        } catch (e) {
            return next(e);
        }
    }
);

export default router;
