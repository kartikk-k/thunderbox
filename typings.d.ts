type OrgType = {
    id: string;
    name: string;
    created_at: string;
  };
  
  type Member = {
    id: string;
    created_at: string;
    role: string;
    user: string;
    org_id: string;
    orgs?: OrgType
  };

  type CodeFile = {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
    project: string;
    staging_code: string;
    production_code: string;
  }