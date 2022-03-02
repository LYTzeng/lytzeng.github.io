# My Blog2.0

I'm tired of using VuePress...

## Hello Hugo!
Run this on an Ubuntu 20.04:

```
sudo snap install hugo --channel=extended
```

## Theme
[LoveKana](https://github.com/LYTzeng/LoveKana) | [Document](https://hugoloveit.com/)

```
hugo new site yourSiteName
cd yourSiteName
git init
git submodule add https://github.com/LYTzeng/LoveKana themes/LoveKana
cp -a themes/hugo-clarity/exampleSite/* .
```

And then edit `config.toml`.

## Maybe you'd like to build a pipeline to easily build and deploy ur blog
- [Building a CI/CD pipeline for Hugo websites](https://aws.amazon.com/tw/blogs/infrastructure-and-automation/building-a-ci-cd-pipeline-for-hugo-websites/)
- [Using AWS CodePipeline w/ Github](https://docs.aws.amazon.com/codepipeline/latest/userguide/connections-github.html)

Noice! Lets goooooo
