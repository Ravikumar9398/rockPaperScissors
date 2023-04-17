import './index.css'

const PlayerItems = props => {
  const {itemDetails, selectedChoice} = props
  const {imageUrl, id} = itemDetails

  const onClickItem = () => {
    selectedChoice(id, imageUrl)
  }

  return (
    <div className="images-container">
      <button
        type="button"
        className="button"
        onClick={onClickItem}
        data-testid={`${id.toLowerCase()}Button`}
      >
        <img src={imageUrl} alt={id} className="image" />
      </button>
    </div>
  )
}

export default PlayerItems
