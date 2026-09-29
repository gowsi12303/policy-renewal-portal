import { useRef, useState } from 'react'
import { ACCEPTED_FILE_TYPES } from '../../data/selfService'
import Button from '../common/Button'
import Card from '../common/Card'
import '../common/FormField.css'
import Icon from '../common/Icon'
import './selfService.css'

const ACCEPT_ATTRIBUTE = ACCEPTED_FILE_TYPES.map((ext) => `.${ext}`).join(',')

function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function isAccepted(file) {
  const extension = file.name.split('.').pop().toLowerCase()
  return ACCEPTED_FILE_TYPES.includes(extension)
}

// Frontend prototype: the file is only held in state, never uploaded.
function DocumentUpload({ onNotify }) {
  const inputRef = useRef(null)
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const [isDragging, setIsDragging] = useState(false)

  const selectFile = (selected) => {
    if (!selected) return
    if (!isAccepted(selected)) {
      setError('This file type is not supported. Use PDF, DOCX, XLSX, JPG or PNG.')
      return
    }
    setError('')
    setFile(selected)
    onNotify('Document selected successfully.')
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)
    selectFile(event.dataTransfer.files[0])
  }

  const handleRemove = () => {
    setFile(null)
    // Clear the input so the same file can be selected again
    if (inputRef.current) inputRef.current.value = ''
    onNotify('Document removed.', 'info')
  }

  return (
    <Card title="Upload Renewal Document" subtitle="Files stay in your browser in this demo.">
      <div
        className={`ss-dropzone ${isDragging ? 'is-dragging' : ''}`}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <span className="ss-dropzone__icon">
          <Icon name="upload" />
        </span>
        <p className="ss-dropzone__text">Drag and drop a file here or browse from your computer.</p>
        <p className="ss-dropzone__types">Supported: PDF, DOCX, XLSX, JPG, PNG</p>
        <Button variant="primary" onClick={() => inputRef.current?.click()}>
          Browse Files
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT_ATTRIBUTE}
          hidden
          onChange={(e) => selectFile(e.target.files[0])}
        />
      </div>

      {error && (
        <p className="form-field__error ss-upload__error" role="alert">
          {error}
        </p>
      )}

      {file && (
        <div className="ss-file">
          <Icon name="document" className="ss-file__icon" />
          <div className="ss-file__details">
            <p className="ss-file__name">{file.name}</p>
            <p className="ss-file__size">{formatFileSize(file.size)} · Ready to attach</p>
          </div>
          <Button variant="ghost" onClick={handleRemove} aria-label={`Remove ${file.name}`}>
            Remove
          </Button>
        </div>
      )}
    </Card>
  )
}

export default DocumentUpload
