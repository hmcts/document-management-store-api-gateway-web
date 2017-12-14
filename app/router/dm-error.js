const dmErrorHandle = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.asset_path = '/public/'

  // render the error page
  const status = isNaN(err.status) ? 500 : err.status
  if (status >= 500) {
    err.error = 'Internal Server Error'
  }
  res.status(status)
  res.format({
    'text/html': function () {
      res.render('errors/error', err)
    },
    default: function () {
      res.json(err)
    }
  })
}

module.exports = dmErrorHandle
