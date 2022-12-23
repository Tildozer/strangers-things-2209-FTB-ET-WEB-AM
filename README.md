# strangers-things-2209-FTB-ET-WEB-AM

- npm i
- npm run build
- open file dist/index.html from browser


 {
                      editAPost && post._id === editPostObj._id ?
                        <Fragment>
                          <button
                            onClick={_ => setEditAPost(false) }
                          >
                            Exit post edit.
                          </button>
                          <EditPost 
                            editPostObj={ editPostObj }
                            setEditPostObj={ setEditPostObj }
                            setEditAPost={ setEditAPost }
                            token={ token }
                            setUser={ setUser }
                            pathName={ pathName }
                            getPosts={ getPosts }
                          />
                        </Fragment>
                      : null
                    }  