<h1>
A Node.js & MySQL application - bamazon
</h1>
# bamazon
An Amazon-like storefront with MySQL. The app will take in orders from customers and deplete stock from the store's inventory. The app also tracks product sales across the store's departments and then provides a summary of the highest-grossing departments in the store.
<h2>
Specifications and Functionality
</h2>
<p>A MySQL Database called <code>bamazon</code> has been created.</p>
<p>A Table inside of that database called <code>products</code>.</p>
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
<p>This database has been populated with around 10 different products.</p>
<p>A Node application called <code>bamazonCustomer.js</code> has been created. Running this application will first display all of the items available for sale. </p>
<img src="screenShots/bamazonCustomerJSinitialscreen.jpg" alt="">
![Image of bamazonCustomer.js Initial Screen](https://github.com/venkatvenkataraman/bamazon/tree/master/screenShots/bamazonCustomerJSinitialscreen.jpg)
<br>
<p>The app should then prompt users with two messages.</p>
<ul>
<li>The first should ask them the ID of the product they would like to buy.</li>
<li>The second message should ask how many units of the product they would like to buy.</li>
</ul>
<img src="screenShots/bamazonCustomerJSinitialscreen2.jpg" alt="">
![Image of bamazonCustomer.js Product Purchase Query](https://github.com/venkatvenkataraman/bamazon/tree/master/screenShots/bamazonCustomerJSinitialscreen2.jpg)
<br>
</li>
<p>Once the customer has placed the order, the application checks if the store has enough of the product to meet the customer's request.</p>
<ul>
<li>If not, the app logs a phrase like <code>Insufficient quantity!</code>, and then prevent the order from going through.</li>
</ul>
<p>However, if your store <em>does</em> have enough of the product, you should fulfill the customer's order.</p>
<ul>
<li>This means updating the SQL database to reflect the remaining quantity.</li>
<li>Once the update goes through, show the customer the total cost of their purchase.</li>
</ul>
<img src="screenShots/bamazonCustomerJSTransactionComplete.jpg" alt="">
![Image of bamazonCustomer.js Product Purchase Completion](https://github.com/venkatvenkataraman/bamazon/tree/master/screenShots/bamazonCustomerJSTransactionComplete.jpg)

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
<h3> bamazonManager.js Screenshots </h3>
<img src="screenShots/bamazonManagerJSinitialscreen1.jpg" alt="">
![Image of bamazonManager.js Initial Menu Screen](https://github.com/venkatvenkataraman/bamazon/tree/master/screenShots/bamazonManagerJSinitialscreen1.jpg)
<img src="screenShots/bamazonManagerJSViewProductsForSale.jpg" alt="">
![Image of bamazonManager.js Product For Sale Screen](https://github.com/venkatvenkataraman/bamazon/tree/master/screenShots/bamazonManagerJSViewProductsForSale.jpg)
<img src="screenShots/bamazonManagerJSViewLowInventory.jpg" alt="">
![Image of bamazonManager.js Low Inventory Screen](https://github.com/venkatvenkataraman/bamazon/tree/master/screenShots/bamazonManagerJSViewLowInventory.jpg)
<img src="screenShots/bamazonManagerJSAddToInventory.jpg" alt="">
![Image of bamazonManager.js Add to Inventory Screen](https://github.com/venkatvenkataraman/bamazon/tree/master/screenShots/bamazonManagerJSAddToInventory.jpg)
<img src="screenShots/bamazonManagerJSAddNewProduct.jpg" alt="">
![Image of bamazonManager.js Add New Product Screen](https://github.com/venkatvenkataraman/bamazon/tree/master/screenShots/bamazonManagerJSAddNewProduct.jpg)
<img src="screenShots/bamazonManagerJSNewlyAddedProduct.jpg" alt="">
![Image of bamazonManager.js Newly Added Product Screen](https://github.com/venkatvenkataraman/bamazon/tree/master/screenShots/bamazonManagerJSNewlyAddedProduct.jpg)

