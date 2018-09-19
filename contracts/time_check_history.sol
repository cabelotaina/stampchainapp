pragma solidity ^0.4.25;

contract TimeCheck{
	address private _owner = msg.sender;
	string private worker_hash;

	mapping (uint256 => string) private dayWorkHistory;

	constructor(string worker_hash) public {
		// user send your IPFS hash with your information if He want
		_worker_hash = worker_hash;
	}

	modifier onlyOwner {
	    if(msg.sender != _owner) throw;
	    _
	}

	function addDayOfWork(string _hash) onlyOwner public {
	  dayWorkHistory[timeCall()] = _hash;
	}

	function getDayWorkHistoryAll() onlyOwner public returns (string[]) {
		return dayWorkHistory;
	}

  function timeCall() onlyOwner private returns (uint256){
    return now;
  }

}