import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Pagination from 'material-ui-pagination'
import PrizeSnippet from './PrizeSnippet'

const itemsPerPage = 10 /* number of items per page */
const display = 10 /* number of pages to see in the paginator */

export class PrizeList extends PureComponent {

  state = {
    currentPage: 1
  }

  setTopRef = (element) => {
    this.topPosition = element
  }

  handlePageClick = (currentPage) => {
    this.setState({ currentPage })
    this.topPosition.scrollIntoView()
    // window.scroll(0, 0)
  }

  render() {
    const { currentPage } = this.state
    const { prizes } = this.props
    const total = Math.ceil(prizes.length / itemsPerPage)
    const offset = Math.ceil((currentPage - 1) * itemsPerPage)
    const visiblePrizes = prizes.slice(offset, offset + itemsPerPage)
    const pagination = (prizes.length >= itemsPerPage) ?
      (<Pagination
        total={total}
        current={currentPage}
        display={display}
        onChange={this.handlePageClick}
      />)
      : null
    return (
      <div ref={this.setTopRef}>
        {pagination}
        <ul>
          {visiblePrizes.map((prize, index) =>
            <PrizeSnippet
              key={`${prize.image}-${index}`}
              prize={prize}
            />
          )}
        </ul>
        {pagination}
      </div>
    )
  }
}

PrizeList.propTypes = {
  prizes: PropTypes.arrayOf(PropTypes.object)
}

export default PrizeList

