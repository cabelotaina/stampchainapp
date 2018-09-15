pragma solidity ^0.4.11;

contract TimeCheck{
	address internal _owner = msg.sender;

	string[] internal dayWorkHistory;

	function TimeCheck(string hash){
		_hash = hash;
	}

	modifier onlyBy(address _account) {
		require(msg.sender == _account);
		_;
	}

	function addDayOfWork(string _hash) onlyBy(_owner) {
		dayWorkHistory.push(hash);
	}

	function getDayWorkHistoryAll() onlyBy(_owner) returns (string[]) {
		return dayWorkHistory;
	}
	
}