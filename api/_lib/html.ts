export type Dict = Record<string, string>;

export const renderRow = ([slug, url]: [string, string]): string => /* html */ `
  <tr>
    <td>${slug}</td>
    <td><a href="${url}" target="_blank" rel="noopener noreferer">${url}</a></td>
  </tr>
`;

export const renderRows = (dict: Dict): string => {
  return Object.entries(dict).map(renderRow).join("");
};

export const renderHtml = (dict: Dict = {}): string => /* html */ `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>nbrs.fyi</title>
    <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@1.*/css/pico.classless.min.css" />
  </head>
  <body>
    <main>
      <hgroup>
        <h1>nbrs.fyi</h1>
        <h2>if you can see this, hello!</h2>
      </hgroup>
      <figure>
        <table>
          <thead>
            <tr>
              <th scope="col">Slug</th>
              <th scope="col">URL</th>
            </tr>
          </thead>
          <tbody>
            ${renderRows(dict)}
          </tbody>
        </table>
      </figure>
      <blockquote>
        "You speak an infinite deal of nothing."
        <footer>
          <cite>- William Shakespeare, The Merchant of Venice</cite>
        </footer>
      </blockquote>
    </main>
  </body>
</html>
`;
