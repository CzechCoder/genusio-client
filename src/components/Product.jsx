// this is the item shown in the katalog

const Product = ({item}) => {
    return (
        <div className="p-container">
            <img src={item.img} alt="product"/>
            <div className="p-info">
                {item.communityname}
            </div>
        </div>
    )

}


export default Product
