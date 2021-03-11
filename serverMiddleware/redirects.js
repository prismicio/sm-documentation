/*

Redirects are defined in the `redirects` array. The middleware loops
over the array to find the first redirect that matches the current URL.
Matching is regex, prefixed with `^`, so the it will only work if the
URL and the redirect match from beginning, however, the URL can be
longer than the redirect.

For example:

If you navigate to:

slicemachine.dev/cats/dogs

Then the below redirect would work, because both the URL path 
("/cats/dogs") and the redirect ("/cats") start with "/cats".
```
{
  from: "/cats",
  to: "http://cats.com"
}
```
This redirect would not work, even though both redirect and URL include
"/dogs":
```
{
  from: "/dogs",
  to: "http://dogs.com"
}
```

*/

const redirects = [
  {
    from: "/documentation/nuxt/quick-start",
    to:
      "https://prismic.io/docs/technologies/run-a-pre-configured-project-nuxtjs"
  },
  {
    from: "/documentation/nuxt/install-npm",
    to: "https://prismic.io/docs/technologies/configure-project-manually-nuxtjs"
  },
  {
    from: "/documentation/nuxt/install-the-cli",
    to: "https://prismic.io/docs/technologies/configure-project-manually-nuxtjs"
  },
  {
    from: "/documentation/nuxt/sign-in-to-the-cli",
    to: "https://prismic.io/docs/technologies/configure-project-manually-nuxtjs"
  },
  {
    from: "/documentation/nuxt/create-a-new-nuxt-app",
    to: "https://prismic.io/docs/technologies/configure-project-manually-nuxtjs"
  },
  {
    from: "/documentation/nuxt/run-the-prismic-slice-machine-command",
    to:
      "https://prismic.io/docs/technologies/configure-project-automatically-nuxtjs"
  },
  {
    from: "/documentation/nuxt/add-the-slice-zone-to-your-page",
    to: "https://prismic.io/docs/technologies/query-content-from-cms-nuxtjs"
  },
  {
    from: "/documentation/nuxt/run-your-project",
    to:
      "https://prismic.io/docs/technologies/run-a-pre-configured-project-nuxtjs"
  },
  {
    from: "/documentation/nuxt/query-with-the-slice-zone",
    to: "https://prismic.io/docs/technologies/query-content-from-cms-nuxtjs"
  },
  {
    from: "/documentation/nuxt/query-with-the-prismic-object",
    to: "https://prismic.io/docs/technologies/query-content-from-cms-nuxtjs"
  },
  {
    from: "/documentation/nuxt/nav-bars-and-menus",
    to: "https://prismic.io/docs/technologies/nav-bars-footers-and-menus-nuxtjs"
  },
  {
    from: "/documentation/nuxt/the-nuxt-config-js-file",
    to: "https://prismic.io/docs/technologies/configure-project-manually-nuxtjs"
  },
  {
    from: "/documentation/nuxt/html-serializer",
    to: "https://prismic.io/docs/technologies/html-serializer-nuxtjs"
  },
  {
    from: "/documentation/nuxt/deploying",
    to:
      "https:///prismic.io/docs/technologies/deployment-rebuilding-previewing-nuxtjs"
  },
  {
    from: "/documentation/next/nextjs-quick-start",
    to: "https://prismic.io/docs/technologies/getting-started-nextjs"
  },
  {
    from: "/documentation/next/next-installing-npm",
    to: "https://prismic.io/docs/technologies/installing-npm-nextjs"
  },
  {
    from: "/documentation/next/next-install-the-prismic-cli",
    to: "https://prismic.io/docs/technologies/log-in-with-the-cli-nextjs"
  },
  {
    from: "/documentation/next/next-log-in-with-the-cli",
    to: "https://prismic.io/docs/technologies/log-in-with-the-cli-nextjs"
  },
  {
    from: "/documentation/next/next-create-a-new-app",
    to: "https://prismic.io/docs/technologies/create-a-new-app-nextjs"
  },
  {
    from: "/documentation/next/next-running-the-prismic-slice-machine-command",
    to:
      "https://prismic.io/docs/technologies/running-the-prismic-slice-machine-command-nextjs"
  },
  {
    from: "/documentation/next/next-adding-the-slicezone-component",
    to:
      "https://prismic.io/docs/technologies/adding-the-slicezone-component-nextjs"
  },
  {
    from: "/documentation/next/next-running-your-project",
    to: "https://prismic.io/docs/technologies/running-your-project-nextjs"
  },
  {
    from: "/documentation/next/next-customization",
    to: "https://prismic.io/docs/technologies/customization-nextjs"
  },
  {
    from: "/documentation/next/nextjs-query-by-uid",
    to: "https://prismic.io/docs/technologies/query-by-uid-nextjs"
  },
  {
    from: "/documentation/next/next-query-a-singleton-type",
    to: "https://prismic.io/docs/technologies/query-a-singleton-type-nextjs"
  },
  {
    from: "/documentation/next/next-content-outside-of-the-slicezone",
    to:
      "https://prismic.io/docs/technologies/content-outside-of-the-slicezone-nextjs"
  },
  {
    from: "/documentation/next/next-nav-bars-and-menus",
    to: "https://prismic.io/docs/technologies/navbars-footers-and-menus-nextjs"
  },
  {
    from: "/documentation/next/lifecycle-hooks",
    to: "https://prismic.io/docs/technologies/lifecycle-hooks-nextjs"
  },
  {
    from: "/documentation/next/nextjs-html-serializer",
    to: "https://prismic.io/docs/technologies/html-serializer-nextjs"
  },
  {
    from: "/documentation/next/nextjs-previews",
    to: "https://prismic.io/docs/technologies/previews-nextjs"
  },
  {
    from: "/documentation/next/nextjs-deployment-rebuilding",
    to: "https://prismic.io/docs/technologies/deployment-rebuilding-nextjs"
  },
  {
    from: "/documentation/next",
    to: "https://prismic.io/docs/technologies/getting-started-nextjs"
  },
  {
    from: "/documentation/nuxt",
    to: "https://prismic.io/docs/technologies/nuxtjs"
  },
  {
    from: "/documentation",
    to: "https://prismic.io/docs"
  }
];

module.exports = function(req, res, next) {
  const host = req.headers.host;
  const fullUrl = req.url;
  var url = req.url.split("?")[0];
  var urlParams = null;
  if (req.url.includes("?")) {
    urlParams = "?" + req.url.split("?")[1];
  }

  // const redirect = redirects.find(r => r.from === url);
  const redirect = redirects.find(r => url.match(new RegExp(r.from)));
  console.log(url);
  console.log(redirect);
  if (redirect) {
    var newLocation;
    if (urlParams) {
      newLocation = redirect.to + urlParams;
    } else {
      newLocation = redirect.to;
    }
    res.writeHead(301, {
      Location: newLocation
    });
    res.end();
  } else {
    next();
  }
};
