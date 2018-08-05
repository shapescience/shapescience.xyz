# shapescience.xyz
Arthur Flam's personnal blog.

> this README is a work in progress

# Domain setup with AWS
Follow the instructions:
- https://agop.me/post/https-enabled-portfolio-hugo-s3-cloudfront.html
- https://lustforge.com/2016/02/27/hosting-hugo-on-aws/

For the email setup, there is [a little more work](https://techpolymath.com/serverless-replacement-for-basic-email-services/).

Make sure to get certificates, validate your domain for emails, use `s3`'s web hosting feature to avoid ugly urls, and you should be good!

## Blog setup
- Install hugo

```bash
# get the release corresponding to your platform
wget https://github.com/gohugoio/hugo/releases/download/v0.45.1/hugo_extended_0.45.1_Linux-64bit.tar.gz
tar xvf hugo_extended_0.45.1_Linux-64bit.tar.gz
```

- Get the blog and theme

```bash
git clone --recurse-submodules git://github.com/shapescience/shapescience.xyz
cd shapescience.xyz
```

- Build the blog

```bash
# adjust to your needs...
./hugo -t casper-two -w server --bind=0.0.0.0 --navigateToChanged --baseURL=$YOU_IP -D
# if you use npm/yarn edit package.json to just use
npm run-script server
# TODO: just use make
```

- Install `awscli` tools:

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
- commit `/static`
- check metatags
- check mathjax issues
- add syntax highlighting

```bash
# so no need for this anymore?
# pip install Pygments
```

- add a section for shorter articles
- finish more drafts
- asset pipeline: image resizing, compression, html/css
- where does this go?
```
{
	"Version": "2008-10-17",
	"Id": "PolicyForCloudFrontPrivateContent",
	"Statement": [
		{
			"Sid": "1",
			"Effect": "Allow",
			"Principal": {
				"AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity E2GROLZVRI9MHD"
			},
			"Action": "s3:GetObject",
			"Resource": "arn:aws:s3:::shapescience.xyz/*"
		}
	]
}
```
