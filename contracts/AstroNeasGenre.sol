// SPDX-License-Identifier: GPL-3.0

//####################### ASTRO NEAS ####################### 

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract AstroNeas is ERC721Enumerable {

  address public designated_owner;
  uint public totalMinted;
  mapping (address => bool) public autorized;
  mapping (uint => bool) public ID2gender;
  using Strings for uint256;
  string baseURImen;
  string baseURIwomen;
  string InitName = "AstroNeas";
  string InitSymbol = "ANS";
  string public baseExtension = ".json";
  uint256 public maxSupply = 2120;
  uint256 public maxMintAmount = 2120;
  uint256 public foundersMint = 1060;
  bool public paused = false;
  mapping(address => bool) public whitelisted;

  constructor(
    // string memory _name,
    // string memory _symbol,
    string memory _initBaseURImen,
    string memory _initBaseURIwomen,
    address _designated_owner
//   ) ERC721(_name, _symbol) {
  ) ERC721(InitName, InitSymbol) {
    designated_owner= _designated_owner;
    autorized[designated_owner]=true;
    setBaseURImen(_initBaseURImen);
    setBaseURIwomen(_initBaseURIwomen);
    mint(msg.sender, foundersMint);
  }

    function autorizeAddress(address _address) public onlyAutorized{
        autorized[_address]=true;
    }

    modifier onlyAutorized(){
        require(autorized[msg.sender],"Only autorized");
        _;
    }

  // internal
  function _baseURImen() internal view virtual returns (string memory) {
    return baseURImen;
  }
  // internal
  function _baseURIwomen() internal view virtual returns (string memory) {
    return baseURIwomen;
  }

  // public
  function mint(address _to, uint256 _mintAmount) public {
    uint256 supply = totalSupply();
    require(!paused,"minteo en pausa");
    require(_mintAmount > 0,"cantidad a mintear debe ser positiva");
    require(_mintAmount <= maxMintAmount,"cantidad a mintear mayor al supply maximo total");
    require(supply + _mintAmount <= maxSupply,"cantidad a mintear mayor al maximo disponble");

    for (uint256 i = 1; i <= _mintAmount; i++) {
        if(totalMinted %2==0){
            ID2gender[totalMinted+1]=true;
        }
      _safeMint(_to, supply + i);
      totalMinted++;
    }
  }

  function walletOfOwner(address _owner)
    public
    view
    returns (uint256[] memory)
  {
    uint256 ownerTokenCount = balanceOf(_owner);
    uint256[] memory tokenIds = new uint256[](ownerTokenCount);
    for (uint256 i; i < ownerTokenCount; i++) {
      tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
    }
    return tokenIds;
  }

  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );
    if(ID2gender[tokenId]){
    return bytes(_baseURImen()).length > 0
        ? string(abi.encodePacked(_baseURImen(), tokenId.toString(), baseExtension))
        : "";
    }
    else{
        return bytes(_baseURIwomen()).length > 0
            ? string(abi.encodePacked(_baseURIwomen(), tokenId.toString(), baseExtension))
            : "";
    }
    

  }


  function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyAutorized {
    maxMintAmount = _newmaxMintAmount;
  }

  function setBaseURImen(string memory _newBaseURImen) public onlyAutorized {
    baseURImen = _newBaseURImen;
  }
  function setBaseURIwomen(string memory _newBaseURIwomen) public onlyAutorized {
    baseURIwomen = _newBaseURIwomen;
  }

  function setBaseExtension(string memory _newBaseExtension) public onlyAutorized {
    baseExtension = _newBaseExtension;
  }

  function pause(bool _state) public onlyAutorized {
    paused = _state;
  }
 
//  function whitelistUser(address _user) public onlyAutorized {
//     whitelisted[_user] = true;
//   }
 
//   function removeWhitelistUser(address _user) public onlyAutorized {
//     whitelisted[_user] = false;
//   }
  
}

//Fork de Contrato de Prueba Hashlips
//Modificado y Adaptado por Rafael SantaMaría de BitsDapps.tech para el proyecto "Astroneas"