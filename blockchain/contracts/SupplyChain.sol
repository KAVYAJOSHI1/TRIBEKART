// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract SupplyChain {
    enum State { Created, InTransit, Delivered }

    struct Item {
        uint id;
        string name;
        uint price;
        State state;
        address seller;
        address buyer;
    }

    uint public itemCount;
    mapping(uint => Item) public items;

    event ItemCreated(uint id, string name, uint price, address seller);
    event ItemPurchased(uint id, address buyer);
    event ItemDelivered(uint id);

    function createItem(string memory _name, uint _price) public {
        itemCount++;
        items[itemCount] = Item(itemCount, _name, _price, State.Created, msg.sender, address(0));
        emit ItemCreated(itemCount, _name, _price, msg.sender);
    }

    function purchaseItem(uint _id) public payable {
        Item storage item = items[_id];
        require(_id > 0 && _id <= itemCount, "Item does not exist");
        require(msg.value == item.price, "Incorrect price");
        require(item.state == State.Created, "Item not available");
        // require(item.seller != msg.sender, "Seller cannot buy their own item");

        item.buyer = msg.sender;
        item.state = State.InTransit;
        
        payable(item.seller).transfer(msg.value);
        
        emit ItemPurchased(_id, msg.sender);
    }

    function confirmDelivery(uint _id) public {
        Item storage item = items[_id];
        require(item.buyer == msg.sender, "Only buyer can confirm delivery");
        require(item.state == State.InTransit, "Item not in transit");
        
        item.state = State.Delivered;
        emit ItemDelivered(_id);
    }
}
