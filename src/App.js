import { useState } from 'react';
import './index.css';


const cartItems = [
  {
    id: 1,
    name: 'Fresho Capsicum Green, 1 kg',
    image: 'images/capsicum.jpg',
    price: 48,
    isAdded: false,
  },
  {
    id: 2,
    name: 'Fresho Onion (Loose), 5 kg',
    image: 'images/onion.jpg',
    price: 195,
    isAdded: false,
  },
  {
    id: 3,
    name: 'Fresho Cauliflower, (small) ',
    image: 'images/cauliflower.jpg',
    price: 26.8,
    isAdded: false,
  },
  {
    id: 4,
    name: 'Optimum Nutrition Protein ',
    image: 'images/whey.jpg',
    price: 4699,
    isAdded: false,
  },
]

export default function App() {
  const [cartItem, setCartItem] = useState(cartItems)

 let count = cartItem.length;
  function forList(value) {
    setCartItem((cart) => [...cart, value])
  }

  function handleAdd(id) {
    setCartItem((cartItem) => cartItem.map((val) => val.id === id ? { ...val, isAdded: !val.isAdded } : val))
  }

  function deleteItem(id) {
  
    setCartItem((cartItem) => cartItem.filter((value) => value.id !== id))
  }


  return (
    <div className="App">
      <Heading />
      <Input forList={forList} />
      <Cart cartItem={cartItem} add={handleAdd}
        deleteItem={deleteItem} count={count} />
    </div>
  );
}


function Heading() {

  return (
    <div className='app'>
      <h1 className='title'>SHOPPING LIST  </h1>
      <div className="cart">
        <p className="count">
          0
        </p>
        <img className="material-icons" src='images/cart-logo.png' alt='cart-logo' />
      </div>
    </div>
  )
}

function Input({ forList }) {
  const [image, setImage] = useState('https://img.freepik.com/premium-psd/shopping-cart-3d-render-realistic-transparent_363450-2295.jpg');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!image || !name || !image) return;

    const id = crypto.randomUUID();

    let newObj = {
      id, name, image, price, isAdded: false,
    }
    console.log(newObj);
    forList(newObj) // function to send data to list
    setImage('')
    setName('')
    setPrice('')
  }

  return (
    <form className='input-form' onSubmit={handleSubmit}>
      <span>Image link :</span>
      <input type='text' value={image} onChange={(e) => setImage(e.target.value)} placeholder='image link'></input>
      <span>Item :</span>
      <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='item name'></input>
      <span>Price :</span>
      <input type='text' value={price} onChange={(e) => setPrice(Number(e.target.value))} placeholder='price'></input>
      <button>Add</button>
    </form>
  )
}

function Cart({ cartItem, deleteItem, add, count }) {
  return (
    <div className='carts'>
      <input className='select-all' type='checkbox' />
      <span>Select all</span>
      <span style={{marginLeft : '20px'}}>Total Items: {count}</span> 
      {cartItem.map((el) => <List key={el.id} items={el} add={add} deleteItem={deleteItem} />)}
    </div>
  )
}

function List({ items, deleteItem, add }) {


  return (
    <div className='list'>
      <input type='checkbox' value={items.isAdded} onChange={() => add(items.id)} className='check-box' />
      <img className='images' src={items.image} alt={items.image} />
      <h3 className='item-name' style={items.isAdded ? { textDecoration: 'line-through' } : {}}>{items.name}</h3>
      <p className='item-price'>₹{items.price}</p>
      <button className='btn-delete' onClick={() => deleteItem(items.id)}>❌</button>
    </div>
  )
}