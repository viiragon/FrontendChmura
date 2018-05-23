# frontend_chmura

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## Azure deployment


``` bash

# create web app by clicking

# in azure cli
# create git user
az webapp deployment user set --user-name <username> --password <password>

# enable deployment on azure
az webapp deployment source config-local-git --name <app_name> --resource-group <group_name>


# in local terminal
# add azure remote
git remote add azure <url>

# push changes 
git push azure master

```