module.exports = {
  title: "knockkk's blog",
  theme: "@vuepress/blog",
  head: [
    ["link", { rel: "icon", href: "/tongren.jpeg" }], //浏览器的标签栏的网页图标
  ],
  themeConfig: {
    nav: [
      {
        text: "Blog",
        link: "/",
      },
      {
        text: "Tags",
        link: "/tag/",
      },
      {
        text: "Notes",
        link: "/note",
      },
      // {
      //   text: "About Me",
      //   link: "/pages/about.md",
      // },
    ],
    footer: {
      contact: [
        {
          type: "github",
          link: "https://github.com/knockkk",
        },
        {
          type: "web",
          link: "https://juejin.cn/user/852876756529160/posts",
        },
      ],
    },
  },
};
