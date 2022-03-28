// this is the item shown in the katalog

const Community = ({item}) => {
    return (
        <div className="p-container">
            <img src={item.img} alt="community"/>
            <div className="p-info">
                {item.communityname}
            </div>
        </div>
    )

}


export default Community
