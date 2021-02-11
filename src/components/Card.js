export default class Card {
  constructor({
    cardData,
    template,
    handleCardClick,
    beforeDeleteHandle,
    currentUserId,
    likeHandle,
    removeLikeHandle
  }) {
    this._cardData = cardData;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._beforeDeleteHandle = beforeDeleteHandle;
    this._currentUserId = currentUserId;
    this._likeHandle = likeHandle;
    this._removeLikeHandle = removeLikeHandle;

    this._isLiked = false;
    this._element = null;
    this._likeButton = null;
    this._cardLikesElement  = null
  }

  _setCardLiked() {
    this._isLiked = true;
    this._likeButton.classList.add('card__like_active');
  }

  _addLike() {
    this._likeHandle(this._cardData._id, updatedCardData => {
      this._cardData = updatedCardData;
      this._updateLikesCount();

      this._setCardLiked();
    });
  }

  _setCardDisliked() {
    this._isLiked = false;
    this._likeButton.classList.remove('card__like_active');
  }

  _removeLike() {
    this._removeLikeHandle(this._cardData._id, updatedCardData => {
      this._cardData = updatedCardData;
      this._updateLikesCount();

      this._setCardDisliked();
    });
  }

  _onLikeButtonClick() {
    if (this._isLiked) {
      this._removeLike();
    } else {
      this._addLike();
    }
  }

  _deleteSelf() {
    this._element.remove();
    this._element = null;
    this._likeButton = null;
    this._cardLikesElement = null;
  }

  _onDeleteButtonClick() {
    this._beforeDeleteHandle(this._cardData._id, this._deleteSelf.bind(this));
  }

  _setCardName() {
    this._element.querySelector('.card__name').textContent = this._cardData.name;
  }

  _setCardLikesElement() {
    this._cardLikesElement = this._element.querySelector('.card__likes-count');
  }

  _updateLikesCount() {
    this._cardLikesElement.textContent = this._cardData.likes.length;
  }

  _setCardImage() {
    const cardImage = this._element.querySelector('.card__image');

    cardImage.src = this._cardData.link;
    cardImage.alt = this._cardData.name;
    cardImage.addEventListener('click', () => this._handleCardClick(this._cardData));
  }

  _setLikeButton() {
    this._likeButton = this._element.querySelector('.card__like');
    this._likeButton.addEventListener('click', this._onLikeButtonClick.bind(this));

    if (this._cardData.likes.some(user => user._id === this._currentUserId)) {
      this._setCardLiked();
    }
  }

  _setDeleteButton() {
    const deleteButton = this._element.querySelector('.card__delete');
    if (this._currentUserId === this._cardData.owner._id) {
      deleteButton.addEventListener('click', this._onDeleteButtonClick.bind(this));
    } else {
      deleteButton.remove();
    }
  }

  getElement() {
    this._element = this._template.querySelector('.gallery__grid-item').cloneNode(true);

    this._setCardName();
    this._setDeleteButton();
    this._setCardImage();
    this._setLikeButton();
    this._setCardLikesElement();
    this._updateLikesCount();

    return this._element;
  }
}
