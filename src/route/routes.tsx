import Container from '../container/common/Container'
// import Main from '../pages/Main';
// import PageA from '../pages/PageA';

export const RouterInfo = [
  {
    path: "/",
    element: <Container />,
    children: [
      // {
      //   index: true,
      //   element: <Main />,
      //   label: 'main'
      // },
      // {
      //   path: "/pageA",
      //   element: <PageA />,
      //   label: 'A'
      // },
    ]
  },
]
