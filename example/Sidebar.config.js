let options = [
  {
    title: "Learn",
    titleIcon: <i className="fa fa-graduation-cap"></i>,
    content: [{ id: 1, name: "My courses", to: "/my-courses", disabled: true }]
  },
  {
    title: "Most popular",
    titleIcon: <i className="fa fa-paragraph"></i>,
    // hideBorder: true,
    content: [
      {
        id: 2,
        name: "Web Development",
        icon: <i className="fa fa-chrome"></i>,
        children: [
          {
            title: "JavaScript",
            titleIcon: <i className="fa fa-opera"></i>,
            content: [{ id: 10, name: "functions" }]
          },
          {
            title: "React",
            content: [
              {
                id: 11,
                name: "Higher order components",
                icon: <i className="fa fa-paper-plane"></i>,
                children: [
                  {
                    title: "Functional Component",
                    content: [
                      {
                        id: 20,
                        name: "Reuse",
                        icon: <i className="	fa fa-refresh"></i>,
                        disabled: true
                      }
                    ]
                  }
                ]
              },
              {
                id: 12,
                name: "Hooks",
                icon: <i className="fa fa-random"></i>,
                to: "/hooks"
              }
            ]
          }
        ]
      },
      {
        id: 3,
        name: "Mobile Apps",
        icon: <i className="fa fa-snapchat-ghost"></i>,
        disabled: true
      },
      {
        id: 4,
        name: "Game Development",
        icon: <i className="fa fa-steam"></i>,
        children: [
          {
            title: "More Games",
            content: [
              {
                id: 13,
                name: "Pubg Mobile",
                children: [
                  {
                    title: "Online",
                    titleIcon: <i className="fa fa-exclamation-triangle"></i>,
                    content: [{ id: 14, name: "Server 1" }]
                  }
                ]
              }
            ]
          },
          {
            title: "Online Games",
            content: [
              { id: 15, name: "Counter Strike" },
              { id: 16, name: "GTA SAMP" },
              {
                id: 17,
                name: "Dota 2",
                children: [
                  {
                    title: "Servers",
                    content: [{ id: 18, name: "Server 3", to: "/servers/3" }]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 5,
        name: "Finance",
        icon: <i className="fa fa-sellsy"></i>
      },
      {
        id: 6,
        name: "Data & Analytics",
        icon: <i className="fa fa-database"></i>
      }
    ]
  },
  {
    title: "More from library",
    content: [
      { id: 7, name: "Graphic Design" },
      { id: 8, name: "Digital Marketing" },
      { id: 9, name: "IT Certification" }
    ]
  }
];

export default options;
