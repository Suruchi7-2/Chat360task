const searchForm = document.getElementById('search-form');
const searchResults = document.getElementById('search-results');

searchForm.addEventListener('submit', async(event) => {
            event.preventDefault(); // Prevent default form submission

            const query = document.getElementById('query').value;
            const filterField = document.getElementById('filter-field').value;
            const filterValue = document.getElementById('filter-value').value;

            // Prepare filter object (modify as needed based on your filter logic)
            const filter = filterField && filterValue ? { field: filterField, value: filterValue } : null;

            try {
                const response = await fetch('/search', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query, filter }),
                });

                if (!response.ok) {
                    throw new Error(`Error fetching search results: ${response.statusText}`);
                }

                const data = await response.json();
                // Display search results (modify based on your data structure)
                searchResults.innerHTML = `<h3>Search Results</h3><ul>`;
                data.forEach(log => {
                            searchResults.innerHTML += `<li>
        <b>Level:</b> ${log.level}<br>
        <b>Message:</b> ${log.message}<br>
        <b>Timestamp:</b> ${log.log_stringtimestamp}<br>
        ${log.metadata && log.metadata.source ? `<b>Source:</b> ${log.metadata.source}<br>` : ''}
      </li>`;
    });
    searchResults.innerHTML += `</ul>`;
  } catch (error) {
    console.error('Error searching logs:', error);
    searchResults.innerHTML = `<p>Error: An error occurred during search.</p>`;
  }
});