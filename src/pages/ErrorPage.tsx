// interface ErrorPageResponse {
//   statusText?: string;
//   message: string;
// }

export const ErrorPage: React.FC = () => {
  //const error = useRouteError() as ErrorPageResponse;
  //   console.log(error);
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{/* <i>{error.statusText || error.message}</i> */}</p>
    </div>
  );
};
