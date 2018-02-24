<h1>
A Node.js & MySQL application - bamazon
</h1>
# bamazon
An Amazon-like storefront with MySQL. The app will take in orders from customers and deplete stock from the store's inventory. The app also tracks product sales across the store's departments and then provides a summary of the highest-grossing departments in the store.
<h2>
Specifications and Functionality
</h2>
<p>A MySQL Database called <code>bamazon</code> has been created.</p>
</li>
<li>
<p>A Table inside of that database called <code>products</code>.</p>
</li>
<li>
<p>The products table have each of the following columns:</p>
<ul>
<li>
<p>item_id (unique id for each product)</p>
</li>
<li>
<p>product_name (Name of product)</p>
</li>
<li>
<p>department_name</p>
</li>
<li>
<p>price (cost to customer)</p>
</li>
<li>
<p>stock_quantity (how much of the product is available in stores)</p>
</li>
</ul>
</li>
<li>
<p>This database has been populated with around 10 different products.</p>
</li>
<li>
<p>A Node application called <code>bamazonCustomer.js</code> has been created. Running this application will first display all of the items available for sale. </p>
</li>
<li>
<p>The app should then prompt users with two messages.</p>
<ul>
<li>The first should ask them the ID of the product they would like to buy.</li>
<li>The second message should ask how many units of the product they would like to buy.</li>
</ul>
</li>
<li>
<p>Once the customer has placed the order, the application checks if the store has enough of the product to meet the customer's request.</p>
<ul>
<li>If not, the app logs a phrase like <code>Insufficient quantity!</code>, and then prevent the order from going through.</li>
</ul>
</li>
<li>
<p>However, if your store <em>does</em> have enough of the product, you should fulfill the customer's order.</p>
<ul>
<li>This means updating the SQL database to reflect the remaining quantity.</li>
<li>Once the update goes through, show the customer the total cost of their purchase.</li>
</ul>
</li>

<h2>
Challenge #2: Manager View (Next Level)
</h2>
<ul>
<li>
<p>Create a new Node application called <code>bamazonManager.js</code>. Running this application will:</p>
<ul>
<li>
<p>List a set of menu options:</p>
<ul>
<li>
<p>View Products for Sale</p>
</li>
<li>
<p>View Low Inventory</p>
</li>
<li>
<p>Add to Inventory</p>
</li>
<li>
<p>Add New Product</p>
</li>
</ul>
</li>
<li>
<p>If a manager selects <code>View Products for Sale</code>, the app should list every available item: the item IDs, names, prices, and quantities.</p>
</li>
<li>
<p>If a manager selects <code>View Low Inventory</code>, then it should list all items with an inventory count lower than five.</p>
</li>
<li>
<p>If a manager selects <code>Add to Inventory</code>, your app should display a prompt that will let the manager "add more" of any item currently in the store.</p>
</li>
<li>
<p>If a manager selects <code>Add New Product</code>, it should allow the manager to add a completely new product to the store.</p>
</li>
</ul>
</li>
</ul>
