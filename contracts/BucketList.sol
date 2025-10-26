// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title Bucket List on Base
/// @notice Users can store up to 10 bucket list items on-chain and view others'
contract BucketList {
    uint8 public constant MAX_ITEMS_PER_USER = 10;
    uint256 public constant FEE_PER_ITEM = 0.0001 ether; // 10 cent in ETH (approx)
    
    address public builder; // Your wallet address
    
    // Mapping from user to their list of items
    mapping(address => string[]) private userToItems;

    event ItemAdded(address indexed user, uint8 index, string item);
    event ItemsCleared(address indexed user);
    event FeePaid(address indexed payer, uint256 amount);
    
    constructor(address _builder) {
        builder = _builder; // Your wallet address as builder
    }

    /// @notice Add a new item to the sender's bucket list (requires payment)
    /// @param item The text of the bucket list item (non-empty, trimmed client-side)
    function addItem(string calldata item) external payable {
        require(bytes(item).length > 0, "Empty item");
        require(userToItems[msg.sender].length < MAX_ITEMS_PER_USER, "Max 10 items");
        require(msg.value >= FEE_PER_ITEM, "Insufficient payment");
        
        // Add item to user's list
        userToItems[msg.sender].push(item);
        emit ItemAdded(msg.sender, uint8(userToItems[msg.sender].length - 1), item);
        
        // Send payment to builder
        (bool success, ) = builder.call{value: FEE_PER_ITEM}("");
        require(success, "Fee payment failed");
        emit FeePaid(msg.sender, FEE_PER_ITEM);
        
        // Refund excess payment if any
        if (msg.value > FEE_PER_ITEM) {
            (bool refundSuccess, ) = payable(msg.sender).call{value: msg.value - FEE_PER_ITEM}("");
            require(refundSuccess, "Refund failed");
        }
    }

    /// @notice Returns the list of items for an address
    function getItems(address user) external view returns (string[] memory) {
        return userToItems[user];
    }

    /// @notice Clear all items of the sender (allows editing by reset-and-add)
    function clearMyItems() external {
        delete userToItems[msg.sender];
        emit ItemsCleared(msg.sender);
    }
}









