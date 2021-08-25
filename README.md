# shapescience.xyz
Arthur Flam's personnal blog.

[![Netlify Status](https://api.netlify.com/api/v1/badges/98cc40da-edd5-4f6b-b1d1-59eee0db3cc3/deploy-status)](https://app.netlify.com/sites/infallible-roentgen-405256/deploys)

## Domain setup with AWS
Follow the instructions:
- https://agop.me/post/https-enabled-portfolio-hugo-s3-cloudfront.html
- https://lustforge.com/2016/02/27/hosting-hugo-on-aws/

For the email setup, there is [a little more work](https://techpolymath.com/serverless-replacement-for-basic-email-services/).

Make sure to get certificates, validate your domain for emails, use `s3`'s web hosting feature to avoid ugly urls, and you should be good!

## Build the blog
1. Install hugo

```bash
# go to https://github.com/gohugoio/hugo/releases
# and find the release corresponding to your platform
wget https://github.com/gohugoio/hugo/releases/download/v0.87.0/hugo_extended_0.87.0_Linux-64bit.tar.gz
tar xvf hugo_extended_0.87.0_Linux-64bit.tar.gz
```

2. Get the blog and theme:

```bash
git clone --recurse-submodules git://github.com/shapescience/shapescience.xyz
cd shapescience.xyz
```

3. Build the blog

```bash
# adjust to your needs...
./hugo -t casper-two -w server --bind=0.0.0.0 --navigateToChanged --baseURL=$YOUR_IP -D
# if you use npm/yarn edit package.json to just use
npm run-script server
```

---
### old instructions - now moved to netlify

4. Install `awscli` tools:

```bash
pip install awscli
aws configure --profile arthur
```

## Usage
```bash
npm run-script server
npm run-script build
# adjust your aws profile in package.json
npm run-script deploy
```


## TODO
Next:
- finish more drafts
- add a section for shorter articles
- save drafts / static
