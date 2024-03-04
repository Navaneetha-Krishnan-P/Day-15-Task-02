
fetch('https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json')
    .then(response => response.json())
    .then(data => {

        let table = document.createElement('table');
        table.id = 'myTable';
        table.innerHTML = `
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>E-mail</th>
        </tr>
      </thead>
      <tbody id="tableBody">
      </tbody>
    `;
        document.body.append(table);


        let tableBody = document.getElementById('tableBody');
        let numPages = Math.ceil(data.length / 10);

        for (let i = 1; i <= numPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.addEventListener('click', () => {
                currentPage = i;
                displayPage(currentPage);
            });
            document.body.append(pageButton);
        }

        let currentPage = 1;

        let prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.addEventListener('click', () => {
            currentPage--;
            if (currentPage < 1) currentPage = 1;
            displayPage(currentPage);
        });
        document.body.append(prevButton);

        let nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', () => {
            currentPage++;
            if (currentPage > numPages) currentPage = numPages;
            displayPage(currentPage);
        });
        document.body.append(nextButton);

        displayPage(currentPage);

        function displayPage(page) {
            tableBody.innerHTML = '';
            let start = (page - 1) * 10;
            let end = start + 10;
            for (let i = start; i < end && i < data.length; i++) {
                const row = document.createElement('tr');
                row.innerHTML = `
          <td>${data[i].id}</td>
          <td>${data[i].name}</td>
          <td>${data[i].email}</td>
        `;
                tableBody.append(row);
            }
        }
    });