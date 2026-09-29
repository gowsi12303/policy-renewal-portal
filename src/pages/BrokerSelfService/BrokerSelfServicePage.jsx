import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHeader from '../../components/common/PageHeader'
import Toast from '../../components/common/Toast'
import RecentActivity from '../../components/common/RecentActivity'
import DocumentList from '../../components/selfService/DocumentList'
import DocumentRequestForm from '../../components/selfService/DocumentRequestForm'
import DocumentUpload from '../../components/selfService/DocumentUpload'
import PolicyForm from '../../components/selfService/PolicyForm'
import SelfServiceActionCard from '../../components/selfService/SelfServiceActionCard'
import { renewalDocuments, selfServiceActions, selfServiceActivity } from '../../data/selfService'
import { useToast } from '../../hooks/useToast'
import { preferredScrollBehavior } from '../../utils/motion'
import './BrokerSelfServicePage.css'

// Which page section each quick action opens
const ACTION_TARGETS = {
  add: 'policy',
  update: 'policy',
  upload: 'upload',
  request: 'request',
}

const SECTION_IDS = {
  policy: 'ss-policy-section',
  upload: 'ss-upload-section',
  request: 'ss-request-section',
}

// Demo responses for the document table actions
function documentActionMessage(doc) {
  if (doc.action === 'View') {
    return { message: `Preview of ${doc.name} (${doc.policyId}) is not available in this demo.`, tone: 'info' }
  }
  if (doc.action === 'Review') {
    return { message: `${doc.name} marked for review. Demo mode: nothing was saved.`, tone: 'success' }
  }
  return { message: `Reminder sent to client for ${doc.name}. Demo mode: no email was sent.`, tone: 'success' }
}

function BrokerSelfServicePage() {
  // Optional ?action=add|update|upload|request (e.g. from the Dashboard's "Add Policy")
  // opens the page on that quick action. Without it the page starts as before.
  const [searchParams] = useSearchParams()
  const requestedAction = searchParams.get('action')
  const startAction = Object.hasOwn(ACTION_TARGETS, requestedAction ?? '') ? requestedAction : null

  const [activeAction, setActiveAction] = useState(startAction)
  const [policyMode, setPolicyMode] = useState(startAction === 'add' ? 'add' : 'update')
  const { toast, showToast, closeToast } = useToast()
  const policyRef = useRef(null)
  const uploadRef = useRef(null)
  const requestRef = useRef(null)

  // When opened with ?action=..., bring that section into view and focus it once.
  useEffect(() => {
    if (!startAction) return
    const sectionRefs = { policy: policyRef, upload: uploadRef, request: requestRef }
    const section = sectionRefs[ACTION_TARGETS[startAction]].current
    section?.scrollIntoView({ behavior: preferredScrollBehavior(), block: 'start' })
    section?.focus({ preventScroll: true })
  }, [startAction])

  const handleSelectAction = (actionId) => {
    setActiveAction(actionId)
    if (actionId === 'add' || actionId === 'update') setPolicyMode(actionId)

    // Bring the section into view and move keyboard focus to it
    const sectionRefs = { policy: policyRef, upload: uploadRef, request: requestRef }
    const section = sectionRefs[ACTION_TARGETS[actionId]].current
    section?.scrollIntoView({ behavior: preferredScrollBehavior(), block: 'start' })
    section?.focus({ preventScroll: true })
  }

  const isSectionActive = (section) => activeAction && ACTION_TARGETS[activeAction] === section

  const handleDocumentAction = (doc) => {
    const { message, tone } = documentActionMessage(doc)
    showToast(message, tone)
  }

  return (
    <div className="page">
      <PageHeader
        title="Broker Self-Service"
        subtitle="Manage policies, client information and renewal documents from one place."
        meta={<strong>Self-service workspace</strong>}
      />

      <section aria-labelledby="ss-actions-heading">
        <h2 id="ss-actions-heading" className="sr-only">
          Quick actions
        </h2>
        <div className="self-service__actions">
          {selfServiceActions.map((action) => (
            <SelfServiceActionCard
              key={action.id}
              action={action}
              isActive={activeAction === action.id}
              targetId={SECTION_IDS[ACTION_TARGETS[action.id]]}
              onSelect={handleSelectAction}
            />
          ))}
        </div>
      </section>

      <div className="self-service__grid">
        <div className="self-service__column">
          <div
            id={SECTION_IDS.policy}
            ref={policyRef}
            tabIndex={-1}
            className={`self-service__section ${isSectionActive('policy') ? 'is-active' : ''}`}
          >
            {/* key remounts the form so switching Add/Update loads the right values */}
            <PolicyForm key={policyMode} mode={policyMode} onSaved={showToast} />
          </div>

          <DocumentList documents={renewalDocuments} onAction={handleDocumentAction} />
        </div>

        <div className="self-service__column">
          <div
            id={SECTION_IDS.upload}
            ref={uploadRef}
            tabIndex={-1}
            className={`self-service__section ${isSectionActive('upload') ? 'is-active' : ''}`}
          >
            <DocumentUpload onNotify={showToast} />
          </div>

          <div
            id={SECTION_IDS.request}
            ref={requestRef}
            tabIndex={-1}
            className={`self-service__section ${isSectionActive('request') ? 'is-active' : ''}`}
          >
            <DocumentRequestForm onSent={showToast} />
          </div>

          <RecentActivity
            title="Recent Self-Service Activity"
            subtitle="Your latest uploads, requests and updates."
            activities={selfServiceActivity}
          />
        </div>
      </div>

      <Toast toast={toast} onClose={closeToast} />
    </div>
  )
}

export default BrokerSelfServicePage
