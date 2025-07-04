import AppBar from "../AppBar/AppBar";

export default function Layout({ children }) {
  return (
    <div>
      <AppBar />
      {children}
    </div>
  );
}

// export default function Layout() {
//   return (
//     <>
//       <Header />
//         <Main />
//       <Footer />
//     </>
//   );
// }
